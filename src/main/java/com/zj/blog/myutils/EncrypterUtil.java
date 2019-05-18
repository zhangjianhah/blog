package com.zj.blog.myutils;

import sun.misc.BASE64Encoder;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class EncrypterUtil {
	public static String getMD5(String pwd){

		String lastpwd = "";
		try {
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			//由于MD5加盟结果可能会含有非可视字符，所以再用base64格式进行编码
			BASE64Encoder base64Encoder = new BASE64Encoder();
			lastpwd = base64Encoder.encode(md5.digest(pwd.getBytes("utf8")));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return lastpwd;
	}
}
