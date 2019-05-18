package com.zj.blog.exceptioncontroller;

public class UserNotLoginException extends GlobalException{
	public UserNotLoginException(String message, int code) {
		super(message, code);
	}
}
