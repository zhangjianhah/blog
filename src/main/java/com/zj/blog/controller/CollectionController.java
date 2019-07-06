package com.zj.blog.controller;


import com.zj.blog.myutils.Jutil;
import com.zj.blog.myutils.Subscriber;
import com.zj.blog.service.BlogService;
import com.zj.blog.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class CollectionController {

	@Autowired
	private CollectionService collectionService;


	@Autowired
	private BlogService blogService;

	@PostMapping("/collections/blogs/{bid}")
	@ResponseBody
	public Map<String,Object> insertCollection(@PathVariable("bid")String bid, HttpServletRequest request){
		Map<String,Object> result = new HashMap<String,Object>();
		String delflg = request.getParameter("delflg");
		String getToken = "";
		Subscriber subscriber = null;//jwt中内容
		Cookie[] cookies = request.getCookies();
		for(Cookie cookie : cookies){
			if(cookie.getName().equals("token")){
				getToken = cookie.getValue();
			}
		}
		subscriber = Jutil.unsignToken(getToken,Subscriber.class);
		String uid = subscriber.getId();
		collectionService.updateCollection(uid,bid,delflg);

		blogService.updateBlogCollectionNum(bid,delflg);


		return result;
	}


	@GetMapping(value = "/collections/users/name/{username}")
	@ResponseBody
	public  Map<String,Object> selectCollectionBlog(@PathVariable("username")String username,HttpServletRequest request) throws Exception{
		Map<String,Object> result = new HashMap<String,Object>();
		String offset = request.getParameter("offset");
		String size = request.getParameter("size");
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("username",username);
		param.put("offset",Integer.valueOf(offset));
		param.put("size",Integer.valueOf(size));
		List<Map<String,Object>> list = collectionService.selectCollectionByUname(param);

		result.put("data",list);
		return result;
	}

	@GetMapping(value = "/collections/users/name/{username}/count")
	@ResponseBody
	public  Map<String,Object> selectAllCollectionBlogNum(@PathVariable("username")String username) throws Exception{
		Map<String,Object> result = new HashMap<String,Object>();


		Integer count = collectionService.selectAllCollectionNumByUname(username);
		result.put("data",count);
		return result;
	}


	@PutMapping(value = "/collections/{cid}")
	@ResponseBody
	public Map<String,Object> cancelCollection(@PathVariable("cid")String cid) throws Exception{
		Map<String,Object> result = new HashMap<String,Object>();
		collectionService.updateCollectionBycid(cid);

		return result;
	}
}
