package com.zj.blog.nosql;

import com.zj.blog.pojo.User;
import org.springframework.data.redis.core.RedisTemplate;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

public class SeeUserRedisTakes implements RedisBaiseTakes<String,String,User> {
	@Resource(name="redisTemplate")
	private RedisTemplate redisTemplate;


	@Override
	public void add(String key, String value) {
		redisTemplate.opsForValue().set(key,value);

	}

	@Override
	public void addObj(String objectKey, String key, User object) {

	}

	@Override
	public void addList(String k, List<Map<String, Object>> list) {

	}

	@Override
	public void delete(String key) {

	}

	@Override
	public void delete(List<String> listKeys) {

	}

	@Override
	public void deletObj(String objecyKey, String key) {

	}

	@Override
	public void update(String key, String value) {

	}

	@Override
	public void updateObj(String objectKey, String key, User object) {

	}

	@Override
	public String get(String key) {
		return null;
	}

	@Override
	public User getObj(String objectKey, String key) {
		return null;
	}
}
