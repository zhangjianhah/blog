package com.zj.blog.mapper;

import com.zj.blog.pojo.Resources;

import java.util.List;
import java.util.Map;

public interface ResourcesMapper {
	void insertResources(Resources resources);

	List<Map<String,Object>> selectAllResource();

	Integer updateResources(Resources resources);
}
