package com.zj.blog.nosql;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component("powerRedis")
public class PowerRedis {

	@Resource(name="redisTemplate")
	private RedisTemplate redisTemplate;


	public void addPowerSet(String key,String value){
		redisTemplate.opsForSet().add(key,value);
	}

	public boolean checkPowerSet(String key,String value){
		return redisTemplate.opsForSet().isMember(key,value);
	}

	public void removePowerSet(String key,String value){
		redisTemplate.opsForSet().remove(key,value);
	}
}
