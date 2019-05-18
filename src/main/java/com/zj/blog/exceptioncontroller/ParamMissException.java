package com.zj.blog.exceptioncontroller;

public class ParamMissException extends GlobalException{
	public ParamMissException(String message, int code) {
		super(message, code);
	}
}
