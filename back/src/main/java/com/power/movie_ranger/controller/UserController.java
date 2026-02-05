package com.power.movie_ranger.controller;

import com.power.movie_ranger.dto.UserJoinDto;
import com.power.movie_ranger.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<Long> userJoin(@RequestBody @Valid UserJoinDto dto){
        Long userId = userService.join(dto);
        return ResponseEntity.ok(userId);
    }

    @GetMapping("/check_email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam("email") String email){
        boolean isDuplicate = userService.checkEmail(email);
        return ResponseEntity.ok(isDuplicate);
    }
    @GetMapping("/check_nickName")
    public ResponseEntity<Boolean> checkNickName(@RequestParam("nickName") String nickName){
        boolean isDuplicate = userService.checkNickName(nickName);
        return ResponseEntity.ok(isDuplicate);
    }
}
