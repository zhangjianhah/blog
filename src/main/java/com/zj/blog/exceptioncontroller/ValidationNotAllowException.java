package com.zj.blog.exceptioncontroller;

public class ValidationNotAllowException extends GlobalException{
	public ValidationNotAllowException(String message, int code) {
		super(message, code);
	}
}
