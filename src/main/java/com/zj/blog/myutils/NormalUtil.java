package com.zj.blog.myutils;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.UUID;

public class NormalUtil {

	//一定需要登陆才存在
	public static String requestNeedToken = "POST/PUT/DELETE";
	//不一定需要登陆就可以用
	public static String requestMayNeedToken = "GET";

//	//头像基础路径
//	public static String filePosition = "E:/blogresources/headportrait";
//	//博客文章中的图片的基础路径
//	public static String imagePosition = "E:/blogresources/blogimage";

	//头像基础路径
	public static String filePosition = "/home/blogresources/headportrait";
	//博客文章中的图片的基础路径
	public static String imagePosition = "/home/blogresources/blogimage";

	public static String[] imageFormats = {"gif","jpg","jpeg","png"};
	//url资源固定名词   有序数组
	public static String[] urlStaticWords = {"articles","blogs","categorys","clicknum","collections","comments","count","identifyingcode","images","login","module","name","normalusers","power","role","total","urlresources","users"};
	//权限集合的key
	public static String powekey = "power";

	public static String getCurrentDate(){
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(date);
	}
	public static String getFilename(){
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
		return sdf.format(date);
	}

	public static String getUUId(){
		String s = UUID.randomUUID()
				.toString()
				.replace("-","")
				.toLowerCase();
		return s;

	}

	public static String changeUrlVariable(String url){
		String[] urls = url.split("/");
		StringBuffer sb = new StringBuffer();
		for(int i=1;i<urls.length;i++){
			if(Arrays.binarySearch(urlStaticWords,urls[i]) < 0){
				//查找不到的话，则为变量，转换为%
				sb.append("/%");
			}else {
				sb.append("/").append(urls[i]);
			}
		}

		return sb.toString();
	}

}
