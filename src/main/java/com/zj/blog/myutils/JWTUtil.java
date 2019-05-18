package com.zj.blog.myutils;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JWTUtil {
	/**
	 * APP登录Token的生成和解析
	 *
	 */

	/** token秘钥，请勿泄露，请勿随便修改 backups:JKKLJOoasdlfj */
	public static final String SECRET = "JKKLJOoasdlfj";
	/** token 过期时间: 10天 */
	public static final int calendarField = Calendar.DATE;
	public static final int calendarInterval = 1;

	public static String getToken;

	private static ObjectMapper objectMapper;

	//ObjectMapper单例模式
	public static ObjectMapper getObjectMapperInstance(){
		if(objectMapper == null){
			objectMapper = new ObjectMapper();
		}
		return objectMapper;
	}


	/**
	 * JWT生成Token.<br/>
	 *
	 * JWT构成: header, payload, signature
	 *
	 *
	 *            登录成功后用户user_id, 参数user_id不可传空
	 */
	public static <T> String createToken(T object) throws Exception {
		//将要保存的类转为string字符串
		String jsonString =
				getObjectMapperInstance().writeValueAsString(object);


		Date iatDate = new Date();
		// expire time
		Calendar nowTime = Calendar.getInstance();
		nowTime.add(calendarField, calendarInterval);//过期时间为1周
		Date expiresDate = nowTime.getTime();

		// header Map
		Map<String, Object> map = new HashMap<>();
		map.put("alg", "HS256");
		map.put("typ", "JWT");

		// build token
		// param backups {iss:Service, aud:APP}
		String token = JWT.create().withHeader(map) // header
				.withClaim("iss", "Service") // payload
				.withClaim("aud", "APP")
				.withClaim("subscriber", jsonString)
				.withIssuedAt(iatDate) // sign time
				.withExpiresAt(expiresDate) // expire time
				.sign(Algorithm.HMAC256(SECRET)); // signature

		return token;
	}

	/**
	 * 解密Token
	 *
	 * @param token
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Claim> verifyToken(String token) {
		DecodedJWT jwt = null;
		try {
			JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SECRET)).build();
			jwt = verifier.verify(token);
		} catch (Exception e) {
			e.printStackTrace();
			// token 校验失败, 抛出Token验证非法异常
		}
		return jwt.getClaims();
	}

	/**
	 * 根据Token获取user_id
	 *
	 * @param token
	 * @return user_id
	 */
	public static <T> T unsignToken(String token, Class<T> classT) {
		T object = null;
		try {
			Map<String, Claim> claims = verifyToken(token);
			Claim user_id_claim = claims.get("subscriber");
			if (null == user_id_claim || StringUtils.isEmpty(user_id_claim.asString())) {
				// token 校验失败, 抛出Token验证非法异常
				return null;
			}
			String getSubscriber = user_id_claim.asString();
			object = getObjectMapperInstance()
					.readValue(getSubscriber,classT);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return object;
	}

}
