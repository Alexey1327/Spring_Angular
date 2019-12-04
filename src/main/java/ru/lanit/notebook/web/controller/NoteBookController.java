package ru.lanit.notebook.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.lanit.notebook.dto.NoteDto;
import ru.lanit.notebook.entity.Note;
import ru.lanit.notebook.repository.NoteRepositoryInterface;
import ru.lanit.notebook.request.AddRequest;
import ru.lanit.notebook.request.DeleteRequest;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
public class NoteBookController {

    private final NoteRepositoryInterface noteRepository;

    public NoteBookController(NoteRepositoryInterface noteRepository) {
        this.noteRepository = noteRepository;
    }

    @GetMapping("/api/get")
    public ResponseEntity getData() {

        List<Note> notes = this.noteRepository.findAll();

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

    @PostMapping("/api/save")
    public ResponseEntity save(
        @Valid @RequestBody AddRequest addRequest
    ) {
        noteRepository.saveAndFlush(new Note(
                addRequest.getTitle(),
                addRequest.getText(),
                addRequest.getPriority(),
                addRequest.getDate(),
                addRequest.isDone()
        ));

        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/delete")
    public ResponseEntity delete(
        @RequestBody DeleteRequest request
    ) {
        try {
            noteRepository.deleteById(request.getId());
        } catch (Exception ignored) {}

        return ResponseEntity.ok().build();
    }
}
