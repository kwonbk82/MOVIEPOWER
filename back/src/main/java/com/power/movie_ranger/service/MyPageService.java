package com.power.movie_ranger.service;

import com.power.movie_ranger.dto.UserInfoDto;
import com.power.movie_ranger.entity.User;
import com.power.movie_ranger.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MyPageService {
    private final UserRepository userRepository;

    public UserInfoDto findMyPageInfo(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        return UserInfoDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .nickName(user.getNickName())
                .gender(user.getGender())
                .birthDate(user.getBirthDate())
                .regTime(user.getRegTime())
                .build();
    }
}
