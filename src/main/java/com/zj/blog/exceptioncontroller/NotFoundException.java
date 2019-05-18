package com.zj.blog.exceptioncontroller;

public class NotFoundException extends GlobalException{
	public NotFoundException(String message, int code)
	{
		super(message, code);
	}
}
