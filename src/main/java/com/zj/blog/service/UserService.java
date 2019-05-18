package com.zj.blog.service;

import com.zj.blog.exceptioncontroller.NotFoundException;
import com.zj.blog.exceptioncontroller.Result;
import com.zj.blog.mapper.RoleMapper;
import com.zj.blog.mapper.UserMapper;
import com.zj.blog.myutils.NormalUtil;
import com.zj.blog.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private RoleMapper roleMapper;


	public Map<String,Object> selectUserByUsernameAndPwd(String username, String pwd){
		User user = new User();
		user.setUname(username);
		user.setPwd(pwd);
		user.setDelflg("00");
		Map<String,Object> map = userMapper.selectUserByUsernameAndPwd(user);
		return  map;
	}

	public Integer addUser(User user){

		String roleid = roleMapper.getRoleIdByName("普通用户");


		user.setUid(NormalUtil.getUUId());
		user.setCreatetime(NormalUtil.getCurrentDate());
		user.setIdentity(roleid);
		user.setPower("00");
		Integer result = userMapper.addNormalUser(user);
		return result;


	}

	public User selectUserByUid(String username) throws Exception{
		User user = null;
		try{
			user = userMapper.selectUserByUid(username);
		}catch (Exception e){
			e.printStackTrace();
		}

		if(user == null){
			throw new NotFoundException("user is not found",Result.ErrorCode.USER_NOT_FOUND.getCode());
		}
		user.setPwd("");//把密码去掉
		return user;
	}

	public Integer updateUser(User user){
		Integer result = userMapper.updateUser(user);
		return result;
	}

	public Integer selectUserExceptSAdminCount(){
		return userMapper.selectUserExceptSAdminCount();
	}

	public List<User> selectUserExceptSAdmin(Integer offset,Integer size){
		return userMapper.selectUserExceptSAdmin(offset,size);
	}


	public String selectUsernamebyUsername(String uname){
		return userMapper.selectUsernamebyUsername(uname);
	}

	public void updatenormalUseridentity(String uname){
		List<String> identity = roleMapper.getNormalUserIdentity();
		User user = userMapper.selectUserByUid(uname);
		Iterator<String> iterator = identity.iterator();
		while (iterator.hasNext()){
			if(user.getIdentity().equals(iterator.next())){
				iterator.remove();
			}
		}
		userMapper.updateNormaluserWithIdentity(uname,identity.get(0));

	}


}
