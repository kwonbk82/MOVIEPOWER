package com.power.movie_ranger.service;

import com.power.movie_ranger.dto.UserJoinDto;
import com.power.movie_ranger.entity.User;
import com.power.movie_ranger.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Long join(UserJoinDto dto){
        checkUser(dto);
        validateRequiredFields(dto);
//        matchPassword(dto.getPassword(), dto.getPasswordConfirm());
        User user = User.createUser(dto,passwordEncoder);
        userRepository.save(user);
        return user.getId();
    }

    public Boolean checkEmail(String email){

        return userRepository.existsByEmail(email);
    }
    public Boolean checkNickName(String nickName){

        return userRepository.existsByEmail(nickName);
    }

    public void checkUser(UserJoinDto dto){
        if(userRepository.existsByEmail(dto.getEmail()))
            throw new IllegalStateException("이미 사용중인 이메일입니다.");

        if(userRepository.existsByNickName(dto.getNickName()))
            throw new IllegalStateException("이미 사용중인 닉네임입니다.");
    }

//    public void matchPassword(String password, String confirm){
//        if(!password.equals(confirm))
//            throw new IllegalStateException("비밀번호와 비밀번호확인이 서로 일치하지 않습니다");
//
//    }
    private void validateRequiredFields(UserJoinDto dto) {
        if (dto.getGender() == null) {
            throw new IllegalStateException("성별을 선택해주세요.");
        }
        if (dto.getBirthDate() == null) {
            throw new IllegalStateException("생년월일을 입력해주세요.");
        }
    }
}
