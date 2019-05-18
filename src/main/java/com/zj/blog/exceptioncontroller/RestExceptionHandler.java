package com.zj.blog.exceptioncontroller;

import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.logging.Logger;

@ControllerAdvice
public class RestExceptionHandler {

	@ExceptionHandler(value = NotFoundException.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public Result handleResourceNotFoundException(NotFoundException e)
	{
		return new Result(e.getMessage(), e.getCode());
	}

	@ExceptionHandler(value = ParamMissException.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public Result handleParamMissing(ParamMissException e){
		return new Result(e.getMessage(),e.getCode());
	}

	@ExceptionHandler(value = SourceNotAllowException.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public Result handleSourceNotAllow(SourceNotAllowException e){
		return new Result(e.getMessage(),e.getCode());
	}

	@ExceptionHandler(value = UserNotLoginException.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public Result handleUserNotLogin(UserNotLoginException e){
		return new Result(e.getMessage(),e.getCode());
	}


	@ExceptionHandler(value = ValidationNotAllowException.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public Result handleValidationNotAllow(ValidationNotAllowException e){
		return new Result(e.getMessage(),e.getCode());
	}






}
