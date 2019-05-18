package com.zj.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/*
此处理器专门用来返回各种jsp页面
 */
@Controller
public class ViewController {

	//用户后台页面
	@RequestMapping(value = "/{uid}",method = RequestMethod.GET)
	public String userManager(){
		return "backstage/index";
	}

	//登陆页面
	@RequestMapping(value="/login",method = RequestMethod.GET)
	public String login(){
		return "proscenium/login";
	}

	//登陆页面
	@RequestMapping(value="/register",method = RequestMethod.GET)
	public String register(){
		return "proscenium/register";
	}

	//博客详情页面
	@GetMapping(value = "/articles/{bid}")
	public String showArticles(){
		return "articles";
	}

}
