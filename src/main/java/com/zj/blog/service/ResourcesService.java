package com.zj.blog.service;

import com.zj.blog.mapper.ResourcesMapper;
import com.zj.blog.pojo.Resources;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ResourcesService {

	@Autowired
	private ResourcesMapper resourcesMapper;

	public void insertResources(Resources resources){
		resourcesMapper.insertResources(resources);
	}

	public List<Map<String,Object>> selectAllResource(){
		return resourcesMapper.selectAllResource();
	}

	public void updateResources(Resources resources){
		resourcesMapper.updateResources(resources);
	}
}
