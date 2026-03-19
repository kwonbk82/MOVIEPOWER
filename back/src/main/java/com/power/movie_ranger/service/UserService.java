package com.power.movie_ranger.service;

import com.power.movie_ranger.dto.UserJoinDto;
import com.power.movie_ranger.dto.UserUpdateDto;
import com.power.movie_ranger.entity.User;
import com.power.movie_ranger.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileService fileService;

    @Value("${file.upload.baseLocation}") // C:/shop/
    private String baseLocation;

    @Value("${file.upload.profileDir}") // event
    private String profileDir;

    public Long join(UserJoinDto dto){
        checkUser(dto);
        User user = User.createUser(dto,passwordEncoder);
        userRepository.save(user);
        return user.getId();
    }

    public Long updateUser(Long targetId, UserUpdateDto dto,Long loginId){
        User user = userRepository.findById(targetId)
                .orElseThrow(() -> new RuntimeException("해당 아이디의 유저가 없습니다."));

        user.updateUser(dto,passwordEncoder, loginId);
        return loginId;
    }

    public void deleteUser(Long id,Long userId){

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 아이디의 유저가 없습니다."));

        if(!user.getId().equals(userId)){
            throw new IllegalArgumentException("삭제 권한이 없습니다.");
        }
        userRepository.delete(user);
    }

//    public User findByEmail(String email){
//        return userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
//    }


    public Boolean checkEmail(String email){

        return userRepository.existsByEmail(email);
    }
    public Boolean checkNickName(String nickName){

        return userRepository.existsByNickName(nickName);
    }


    private void checkUser(UserJoinDto dto) {

        if(checkEmail(dto.getEmail()))
            throw new IllegalStateException("이미 사용중인 이메일입니다.");

        if(checkNickName(dto.getNickName()))
            throw new IllegalStateException("이미 사용중인 닉네임입니다.");

        if (dto.getGender() == null) {
            throw new IllegalStateException("성별을 선택해주세요.");
        }
        if (dto.getBirthDate() == null) {
            throw new IllegalStateException("생년월일을 입력해주세요.");
        }
    }

    public void updateUserProfile(Long userId, MultipartFile file) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("유저 없음"));

        String fullPath = baseLocation + profileDir + "/";
        // 1. 기존 사진이 있다면 삭제 (서버 용량 관리)
        if (user.getProfileImg() != null) {
            String oldFilePath = fullPath + "/" + user.getProfileImg();
            fileService.deleteFile(oldFilePath);
        }

        // 2. 새 파일 업로드
        String savedFileName = fileService.uploadFile(
                fullPath,
                file.getOriginalFilename(),
                file.getBytes()
        );

        // 3. DB에는 파일명만 업데이트
        user.updateProfileImg(savedFileName);
    }
}
