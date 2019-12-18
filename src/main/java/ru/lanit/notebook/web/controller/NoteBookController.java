package ru.lanit.notebook.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.lanit.notebook.dto.NoteDto;
import ru.lanit.notebook.entity.Note;
import ru.lanit.notebook.entity.User;
import ru.lanit.notebook.repository.NoteRepositoryInterface;
import ru.lanit.notebook.repository.UserRepositoryInterface;
import ru.lanit.notebook.request.AddRequest;
import ru.lanit.notebook.request.DeleteRequest;

import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(NoteBookController.URL_PREFIX)
public class NoteBookController {

    static final String URL_PREFIX = "api/";

    private final NoteRepositoryInterface noteRepository;
    private UserRepositoryInterface userRepository;

    public NoteBookController(
            NoteRepositoryInterface noteRepository,
            UserRepositoryInterface userRepository
    ) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/get")
    public ResponseEntity getData(Principal principal) {

        User user = this.userRepository.findByUsername(principal.getName());
        List<Note> notes = this.noteRepository.findAllByUser(user);

        List<NoteDto> noteDtos = new ArrayList<>();
        if (notes != null) {
            for (Note note : notes) {
                noteDtos.add(new NoteDto(
                    note.getId(),
                    note.getTitle(),
                    note.getText(),
                    note.getPriority(),
                    note.getDate(),
                    note.isDone()
                ));
            }
        }

        return ResponseEntity.ok(noteDtos);
    }

    @PostMapping("/save")
    public ResponseEntity save(
        @Valid @RequestBody AddRequest addRequest,
        Principal principal
    ) {
        User user = this.userRepository.findByUsername(principal.getName());
        noteRepository.saveAndFlush(new Note(
                addRequest.getTitle(),
                addRequest.getText(),
                addRequest.getPriority(),
                addRequest.getDate(),
                addRequest.isDone(),
                user
        ));

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity delete(
        @RequestBody DeleteRequest request,
        Principal principal
    ) {
        User user = this.userRepository.findByUsername(principal.getName());
        try {
            noteRepository.deleteById(request.getId());
        } catch (Exception ignored) {}

        return ResponseEntity.ok().build();
    }
}
