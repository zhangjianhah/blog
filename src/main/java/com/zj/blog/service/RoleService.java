package com.zj.blog.service;

import com.zj.blog.mapper.RoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RoleService {

	@Autowired
	private RoleMapper roleMapper;


	public List<Map<String,Object>> selectAllPower(String rname){
		return roleMapper.selectAllPower(rname);
	}

	public void insertPower(Map<String,Object> map){
		roleMapper.insertPower(map);
	}

	public Map<String,Object> selectOnePower(String mname,  String rname, String sname){
		return roleMapper.selectOnePower(mname,rname,sname);
	}

	public List<String> getUsermodule(String identity){
		return roleMapper.getUsermodule(identity);
	}

}
