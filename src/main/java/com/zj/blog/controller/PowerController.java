package com.zj.blog.controller;

import com.zj.blog.exceptioncontroller.Result;
import com.zj.blog.exceptioncontroller.UserNotLoginException;
import com.zj.blog.myutils.Jutil;
import com.zj.blog.myutils.Subscriber;
import com.zj.blog.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class PowerController {

	@Autowired
	private RoleService roleService;

	/**
	 * 展示角色的权限
	 * @param rname 角色名称
	 * @return
	 */
	@GetMapping(value = "/power/role/{rname}")
	@ResponseBody
	public Map<String,Object> selectAllPower(@PathVariable("rname") String rname){
		Map<String,Object> result = new HashMap<String,Object>();
		List<Map<String ,Object>> list =
				roleService.selectAllPower(rname);
		result.put("data",list);

		return result;
	}

	@PutMapping(value = "/power/role/{rname}")
	@ResponseBody
	public Map<String,Object> updatePower(@PathVariable("rname") String rname,HttpServletRequest request){
		Map<String,Object> result = new HashMap<String,Object>();

		String mname = request.getParameter("mname");
		String sname = request.getParameter("sname");
		String delflg = request.getParameter("delflg");

		Map<String,Object> map = new HashMap<String,Object>();
		map.put("mname",mname);
		map.put("sname",sname);
		map.put("rname",rname);
		map.put("delflg",delflg);

		roleService.insertPower(map);
		if("01".equals(delflg)){
			result.put("data","01");
		}else {
			result.put("data","00");
		}

		return result;
	}


	@GetMapping(value = "/power/module")
	@ResponseBody
	public Map<String,Object> getModule(HttpServletRequest request) throws UserNotLoginException{
		Map<String,Object> result = new HashMap<String,Object>();
		String getToken = "";
		Cookie[] cookies = request.getCookies();
		for(Cookie cookie : cookies){
			if(cookie.getName().equals("token")){
				getToken = cookie.getValue();
			}
		}

		if("".equals(getToken)){
			throw new UserNotLoginException("对不起，用户尚未登陆",Result.ErrorCode.USER_NOT_LOGIN.getCode());
		}
		Subscriber subscriber = Jutil.unsignToken(getToken,Subscriber.class);
		if(subscriber == null){
			throw new UserNotLoginException("对不起，用户尚未登陆",Result.ErrorCode.USER_NOT_LOGIN.getCode());
		}

		List<String> list = roleService.getUsermodule(subscriber.getIdentity());
		result.put("data",list);

		return result;
	}
}
