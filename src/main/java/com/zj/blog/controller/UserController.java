package com.zj.blog.controller;

import com.zj.blog.exceptioncontroller.NotFoundException;
import com.zj.blog.exceptioncontroller.ParamMissException;
import com.zj.blog.exceptioncontroller.Result;
import com.zj.blog.exceptioncontroller.ValidationNotAllowException;
import com.zj.blog.myutils.EncrypterUtil;
import com.zj.blog.myutils.Jutil;
import com.zj.blog.myutils.NormalUtil;
import com.zj.blog.myutils.Subscriber;
import com.zj.blog.pojo.User;
import com.zj.blog.service.UserService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/users")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/login",method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> login(HttpServletResponse response,HttpServletRequest request) throws ValidationNotAllowException{
		Map<String,Object> result = new HashMap<String, Object>();
		String username = request.getParameter("account");
		String pwd = request.getParameter("pwd");
		String identifyingcode = request.getParameter("identifyingcode");
		pwd = EncrypterUtil.getMD5(pwd);


			//token值
			String getToken = "";
			//加密后的验证码
			String identifyingcode_MD5 = "";
			Cookie[] cookies = request.getCookies();
			if(cookies != null){
				for(Cookie cookie : cookies){
					if(cookie.getName().equals("token")){
						getToken = cookie.getValue();
					}
					if(cookie.getName().equals("identifyingcode")){
						identifyingcode_MD5 = cookie.getValue();
					}
				}
			}
			identifyingcode = EncrypterUtil.getMD5(identifyingcode.toLowerCase());
			if(!identifyingcode.equals(identifyingcode_MD5)){
				throw new ValidationNotAllowException("验证码错误",Result.ErrorCode.VALIDATION_ERROR.getCode());
			}

			Map<String,Object> getmap = userService.selectUserByUsernameAndPwd(username,pwd);

			if(getmap.size() == 0){
				result.put("userid","");
				return result;
			}
			result.put("userid",getmap.get("uid"));

			Subscriber subscriber = new Subscriber();
			subscriber.setId(getmap.get("uid").toString());
			subscriber.setIdentity(getmap.get("identity").toString());
			subscriber.setUsername(getmap.get("uname").toString());
			String token = null;
			try{

				token = Jutil.createToken(subscriber);
			}catch (Exception e){
				e.printStackTrace();
			}

			Cookie cookie = new Cookie("token",token);
			cookie.setPath("/");
			cookie.setMaxAge(60*60*24*1);//cookie保存1天
			response.addCookie(cookie);
			System.out.println("增加了cookie");

			Cookie useridcookie = new Cookie("username",getmap.get("uname").toString());
			useridcookie.setPath("/");
			useridcookie.setMaxAge(60*60*24*1);//cookie保存1天
			response.addCookie(useridcookie);
			System.out.println("增加了cookie");





		return result;
	}

	/**
	 * 获取某位用户的详细信息
	 * @return
	 */
	@GetMapping(value = "/{username}")
	@ResponseBody
	public Map<String,Object> getUserInfo(@PathVariable("username") String username)throws Exception{
		Map<String,Object> result = new HashMap<String,Object>();
		User user = userService.selectUserByUid(username);
		result.put("data",user);
		return result;
	}


	/**
	 * 用户注册
	 * @return
	 */
	@RequestMapping(value = "",method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> addUser(HttpServletRequest request){
		Map<String,Object> result = new HashMap<String,Object>();
		String uname = request.getParameter("uname");
		String pwd = request.getParameter("pwd");
		String phone = request.getParameter("phone");
		String email = request.getParameter("email");
		String birthday = request.getParameter("birthday");
		User user = new User();
		user.setUname(uname);
		user.setPwd(EncrypterUtil.getMD5(pwd));
		user.setPhone(phone);
		user.setEmail(email);
		user.setBirthday(birthday);
		Integer addResult = userService.addUser(user);
		if(addResult == null){
			addResult = 0;
		}
		result.put("result",addResult);

		return result;
	}

	/**
	 *
	 * @param img  上传的图片
	 * @return
	 */

	@RequestMapping(value = "/{uid}",method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object>setUserInfo(MultipartFile img,@PathVariable("uid") String uid)throws ParamMissException,Exception{
		Map<String,Object> result = new HashMap<String,Object>();
		if(img != null && img.getSize() != 0 && uid != null){
			String ext = FilenameUtils.getExtension(img.getOriginalFilename());
			String fileContentName = NormalUtil.getFilename()+"."+ext;
			String filePath = NormalUtil.filePosition+"/"+uid+"/"+fileContentName;
			//创建改用户文件夹
			Path p = Paths.get(filePath).getParent();
			try {
				Files.createDirectories(Paths.get(filePath).getParent());
				//保存图片
				img.transferTo(new File(filePath));
			} catch (IOException e) {
				e.printStackTrace();
			}

			//存入数据库
			User user = new User();
			user.setImg("/headportrait/"+uid+"/"+fileContentName);
			user.setUname(uid);
			userService.updateUser(user);

		}
		else {
			throw new ParamMissException("上传的资源为空",Result.ErrorCode.PARAMETER_NOT_EXIST.getCode());
		}
		return result;
	}

	/**
	 * 修改用户的个人信息
	 *
	 * @return
	 */
	@PutMapping(value = "/{uname}")
	@ResponseBody
	public Map<String,Object>changuserInfo(@PathVariable("uname") String uname,HttpServletRequest request){
		Map<String,Object> result = new HashMap<String,Object>();
		String address = request.getParameter("address");
		String phone = request.getParameter("phone");
		String email = request.getParameter("email");
		String sex = request.getParameter("sex");

		User user = new User();
		user.setUname(uname);
		user.setPhone(phone);
		user.setEmail(email);
		user.setSex(sex);
		user.setAddress(address);
		user.setUpdatetime(NormalUtil.getCurrentDate());

		userService.updateUser(user);

		return result;

	}


	@GetMapping(value = "/normalusers/count")
	@ResponseBody
	public Map<String,Object>getAdminAndNormalCount(){
		Map<String,Object> result = new HashMap<String,Object>();

		Integer count = userService.selectUserExceptSAdminCount();
		result.put("count",count);

		return result;
	}

	@GetMapping(value = "/normalusers")
	@ResponseBody
	public Map<String,Object>getAdminAndNormal(HttpServletRequest request){
		Map<String,Object> result = new HashMap<String,Object>();

		Integer offset = Integer.valueOf(request.getParameter("offset"));
		Integer size = Integer.valueOf(request.getParameter("size"));

		List<User> list = userService.selectUserExceptSAdmin(offset,size);
		result.put("data",list);

		return result;
	}

	@PutMapping(value = "/normalusers/{uname}")
	@ResponseBody
	public Map<String,Object>changeNormalUserIdentity(HttpServletRequest request,@PathVariable("uname")String uname){
		Map<String,Object> result = new HashMap<String,Object>();
		userService.updatenormalUseridentity(uname);


		return result;
	}


	@GetMapping(value = "/name/{uname}")
	@ResponseBody
	public Map<String,Object>checkSameuser(@PathVariable("uname") String uname){
		Map<String,Object> result = new HashMap<String,Object>();

		String getuname = userService.selectUsernamebyUsername(uname);
		result.put("data",getuname);

		return result;
	}




}
