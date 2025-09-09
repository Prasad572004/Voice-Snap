package com.Voicesnap.controller;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Map;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.Voicesnap.entity.DocEntity;
import com.Voicesnap.entity.User;
import com.Voicesnap.service.DocService;
import com.Voicesnap.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/audio")
@RequiredArgsConstructor
public class AudioController {

    private final RestTemplate restTemplate = new RestTemplate();
    private final DocService docService;
    private final UserService userService;

    /** 🎤 AUDIO → TEXT */
    @PostMapping("/att")
    public ResponseEntity<?> audioToText(@RequestParam("file") MultipartFile file) {
        try {
            String pythonUrl = "http://localhost:5000/att";

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", new MultipartInputStreamFileResource(file.getInputStream(), file.getOriginalFilename()));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.exchange(pythonUrl, HttpMethod.POST, requestEntity, Map.class);

            return ResponseEntity.ok(response.getBody());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error converting audio to text: " + e.getMessage());
        }
    }

    /** 🔊 TEXT → AUDIO */
    @PostMapping("/tts")
    public ResponseEntity<?> textToSpeech(@RequestBody Map<String, String> payload) {
        String text = payload.get("text");
        if (text == null || text.isEmpty()) {
            return ResponseEntity.badRequest().body("Text is required");
        }

        String pythonApiUrl = "http://localhost:5000/tts";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = new HashMap<>();
        body.put("text", text);

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<byte[]> response = restTemplate.postForEntity(pythonApiUrl, requestEntity, byte[].class);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            		
                    .body("Error converting text to audio: " + e.getMessage());
        }
    }
    
    @PostMapping("/save-docx")
    public ResponseEntity<?> saveDoc(@RequestParam String text, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        // Fetch the full User object
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        return ResponseEntity.ok(docService.saveDocx(user, text));
    }

    @GetMapping("/list-docs")
    public ResponseEntity<?> listDocs(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }
        return ResponseEntity.ok(docService.listUserDocs(userId));
    }

    @GetMapping("/download-doc/{id}")
    public ResponseEntity<?> downloadDoc(@PathVariable Long id, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        DocEntity doc = docService.getDoc(id);
        if (!doc.getUser().getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can't access this file");
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(doc.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + doc.getFilename() + "\"")
                .body(new ByteArrayResource(doc.getData()));
    }

    @DeleteMapping("/delete-doc/{id}")
    public ResponseEntity<?> deleteDoc(@PathVariable Long id, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        DocEntity doc = docService.getDoc(id);
        if (!doc.getUser().getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can't delete this file");
        }

        docService.deleteDoc(id);
        return ResponseEntity.ok("Deleted");
    }

}
