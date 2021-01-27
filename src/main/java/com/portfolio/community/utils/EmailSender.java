package com.portfolio.community.utils;

import java.util.Map;
import java.util.Random;

import com.portfolio.community.models.MemberRepository;

import org.json.JSONObject;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EmailSender {
    private final Random random = new Random();
    private final MemberRepository memberRepository;
    private final Environment env;

    public String getVerifyCode(Map<String, Object> param) {
        String email = (String) param.get("email");
        String purpose = (String) param.get("purpose");
        System.out.println("[Util : EmailSender] " + purpose + " 요청 - " + email);

        // Email duplicated
        if (purpose.equals("인증 번호") && memberRepository.findAll().stream().anyMatch(m -> m.getEmail().equals(email))) {
            System.out.println("이미 가입된 이메일");
            return "[Info] Email already exist";
        }

        // Email doesn't exist
        if (purpose.equals("임시 암호") && memberRepository.findAll().stream().noneMatch(m -> m.getEmail().equals(email))) {
            System.out.println("가입되지 않은 이메일");
            return "[Info] Email doesn't exist";
        }

        String code = "";
        for (int i = 0; i < 6; i++) {
            code += random.nextInt(10);
        }
        System.out.println("[Util : EmailSender] Code generated " + code);

        JSONObject template_params = new JSONObject();
        template_params.put("to", email);
        template_params.put("verify", code);
        template_params.put("purpose", purpose);

        JSONObject data = new JSONObject();
        data.put("service_id", env.getProperty("emailjs_service_id"));
        data.put("template_id", env.getProperty("emailjs_template_id"));
        data.put("user_id", env.getProperty("emailjs_user_id"));
        data.put("template_params", template_params);

        RestTemplate rest = new RestTemplate(); // 양식 생성
        HttpHeaders headers = new HttpHeaders(); // 헤더 생성
        headers.setContentType(MediaType.APPLICATION_JSON);

        // entity 요청 양식 완성
        HttpEntity<String> requestEntity = new HttpEntity<>(data.toString(), headers);

        // 요청과 응답 교환
        ResponseEntity<String> responseEntity = rest.exchange("https://api.emailjs.com/api/v1.0/email/send",
                HttpMethod.POST, requestEntity, String.class);

        // http 상태 코드
        HttpStatus httpStatus = responseEntity.getStatusCode();
        int status = httpStatus.value();
        System.out.println("Response status: " + status);

        // 응답
        String response = responseEntity.getBody();
        System.out.println("응답" + response);

        return status / 100 == 2 ? code : "[Error] " + response;
    }
}