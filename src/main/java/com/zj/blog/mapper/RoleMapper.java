package com.zj.blog.mapper;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface RoleMapper {
	List<Map<String,Object>> selectAllPower(String rname);

	void insertPower(Map<String,Object> map);

	Map<String,Object> selectOnePower(@Param("mname") String mname, @Param("rname") String rname, @Param("sname") String sname);

	String getRoleIdByName(String rname);

	List<String> getNormalUserIdentity();

	List<String> getUsermodule(String identity);



}
