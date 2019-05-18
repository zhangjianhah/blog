package com.zj.blog.nosql;

import org.springframework.data.redis.core.RedisTemplate;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

public class SeeRedisTakes{
	@Resource(name="redisTemplate")
	private RedisTemplate redisTemplate;

	public void addPowerList(String key, List<Map<String,Object>> list){
		redisTemplate.opsForList().leftPush(key,list);
	}

	public void addHash(String key, Map<String,Object> map){
		redisTemplate.opsForHash().putAll(key,map);
	}
}
