package com.zj.blog.interceptor;

import com.zj.blog.myutils.Jutil;
import com.zj.blog.myutils.NormalUtil;
import com.zj.blog.myutils.Subscriber;
import com.zj.blog.nosql.PowerRedis;
import com.zj.blog.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public class LoginInterceptor implements HandlerInterceptor {

	@Autowired
	private RoleService roleService;

	@Autowired
	private PowerRedis powerRedis;


	/**
	 * 预处理回调方法，实现处理器的预处理（如检查登陆），第三个参数为响应的处理器，自定义Controller
	 * 返回值：true表示继续流程（如调用下一个拦截器或处理器）；false表示流程中断（如登录检查失败），不会继续调用其他的拦截器或处理器，此时我们需要通过response来产生响应；
	 */
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		String getToken = "";
		Subscriber subscriber = null;//jwt中内容
		Cookie[] cookies = request.getCookies();
		if(cookies != null){
			for(Cookie cookie : cookies){
				if(cookie.getName().equals("token")){
					getToken = cookie.getValue();
				}
			}
		}

		String path = request.getRequestURI();
		String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
				+ request.getContextPath() + "/";
		System.out.println("路径："+request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()+request.getRequestURI());

		String method = request.getMethod();
		String url = path.substring(1,path.length());
		url = url.substring(url.indexOf('/'),url.length());

		//此时表示没有token或者token过期
		if("".equals(getToken) || getToken ==null || "null".equals(getToken)){
			subscriber = new Subscriber();
			subscriber.setIdentity("游客");
		}else {
			subscriber = Jutil.unsignToken(getToken,Subscriber.class);
		}
		url = NormalUtil.changeUrlVariable(url);

		String redisPower = subscriber.getIdentity()+method+url;
		if(powerRedis.checkPowerSet(NormalUtil.powekey,redisPower)){
			//如果为true则表示改权限存在，
			return true;
		}else{
			//不再缓存中，需要用户去数据表再查找一次
			Map<String,Object> map = roleService.selectOnePower(method,subscriber.getIdentity(),url);
			//判断权限
			if(map == null){
				//为空表示权限不足
				System.out.println("权限不足");
				response.sendError(HttpServletResponse.SC_FORBIDDEN,"您的权限不足");
				return false;

			}else{
				powerRedis.addPowerSet(NormalUtil.powekey,redisPower);
				return true;
			}
		}


	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

	}
}
