DROP DATABASE IF EXISTS fightclubx;
CREATE DATABASE fightclubx;
USE fightclubx;

-- Usuarios y Roles
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    peso DECIMAL(5,2),
    altura DECIMAL(5,2),
    edad INT,
    disciplina VARCHAR(50),
    rol ENUM('Presidente', 'Vicepresidente', 'Luchador', 'Árbitro', 'Espectador') DEFAULT 'Luchador',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ligas
CREATE TABLE liga (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    division VARCHAR(50),
    descripcion TEXT,
    tipo ENUM('public', 'private') DEFAULT 'public',
    id_usuario_creador INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario_creador) REFERENCES usuario(id) ON DELETE SET NULL
);

-- Torneos
CREATE TABLE torneo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    formato VARCHAR(50),
    id_liga INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_liga) REFERENCES liga(id) ON DELETE CASCADE
);

-- Combates
CREATE TABLE combate (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50),
    num_rounds INT DEFAULT 3,
    duracion_round INT DEFAULT 180, -- en segundos
    estado ENUM('programado', 'en_curso', 'finalizado', 'cancelado') DEFAULT 'programado',
    fecha DATETIME,
    id_liga INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_liga) REFERENCES liga(id) ON DELETE CASCADE
);

-- Participantes de Combate
CREATE TABLE participante_combate (
    id_combate INT,
    id_usuario INT,
    rol_en_combate ENUM('Luchador1', 'Luchador2', 'Árbitro') NOT NULL,
    PRIMARY KEY (id_combate, id_usuario),
    FOREIGN KEY (id_combate) REFERENCES combate(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Resultados de Combate
CREATE TABLE resultado_combate (
    id_combate INT PRIMARY KEY,
    id_ganador INT,
    metodo VARCHAR(100), -- KO, TKO, Decisión, etc.
    observaciones TEXT,
    FOREIGN KEY (id_combate) REFERENCES combate(id) ON DELETE CASCADE,
    FOREIGN KEY (id_ganador) REFERENCES usuario(id) ON DELETE SET NULL
);

-- Ranking
CREATE TABLE ranking (
    id_liga INT,
    id_usuario INT,
    victorias INT DEFAULT 0,
    derrotas INT DEFAULT 0,
    puntos INT DEFAULT 0,
    posicion INT,
    PRIMARY KEY (id_liga, id_usuario),
    FOREIGN KEY (id_liga) REFERENCES liga(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);
