package com.community.lamb.validator;

import com.community.lamb.model.Board;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


public class BoardValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return Board.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Board b = (Board) target;
        if(StringUtils.isEmpty(b.getContent())) {
            errors.rejectValue("content", "key", "내용을 입력하세요");
        }
    }
}
