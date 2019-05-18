package com.zj.blog.mapper;

import com.zj.blog.pojo.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface UserMapper {
	Map<String,Object> selectUserByUsernameAndPwd(User user);

	Integer addNormalUser(User user);

	User selectUserByUid(String username);

	Integer updateUser(User user);

	String selectUidByUname(String uname);

	Integer selectUserExceptSAdminCount();

	List<User> selectUserExceptSAdmin(@Param("offset") Integer offset, @Param("size")Integer size);

	String selectUsernamebyUsername(String uname);

	Integer updateNormaluserWithIdentity(@Param("uname") String uname,@Param("identity") String identity);
}
