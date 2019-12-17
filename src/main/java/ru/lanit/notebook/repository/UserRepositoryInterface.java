package ru.lanit.notebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.lanit.notebook.entity.User;

import java.util.UUID;

@Repository
public interface UserRepositoryInterface extends JpaRepository<User, UUID> {
    @Query("SELECT u FROM User u WHERE LOWER(u.username) = LOWER(:username)")
    public User findByUsername(@Param("username") String username);
}
