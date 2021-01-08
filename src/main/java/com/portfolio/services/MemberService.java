package com.portfolio.services;

import java.util.Random;

import com.portfolio.models.MemberRepository;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final Random random = new Random();
    
    public String getRequestForm(String email) {
        
        // 중복 검사
        if (memberRepository.findAll().stream().anyMatch(m -> m.getEmail().equals(email))) {
            return null;
        }
        
        // 인증번호 생성
        String code = "";
        for (int i = 0; i < 6; i++) {
            code += random.nextInt(10);
        }

        // emailjs 양식 생성
        JSONObject template_params = new JSONObject();
        template_params.put("to", email);
        template_params.put("verify", code);
        JSONObject data = new JSONObject();
        data.put("service_id", "default_service");
        data.put("template_id", "template_j7k08bo");
        data.put("user_id", "user_02sbkPpnh9tWjyd9Em1yi");
        data.put("template_params", template_params);

        return data.toString();
    }
    
}
