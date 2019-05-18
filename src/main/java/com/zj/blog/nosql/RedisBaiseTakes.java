package com.zj.blog.nosql;

import java.util.List;
import java.util.Map;

public interface RedisBaiseTakes<H,K,V> {
	//增
	public void add(K key,String value);
	public void addObj(H objectKey,K key,V object);
	void addList(String key, List<Map<String,Object>> list);
	//删
	public void delete(K key);
	public void delete(List<K> listKeys);
	public void deletObj(H objecyKey,K key);
	//改
	public void update(K key,String value);
	public void updateObj(H objectKey,K key,V object);
	//查
	public String get(K key);
	public V getObj(H objectKey,K key);

}
