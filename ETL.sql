CREATE TABLE AllUser (
    Id SERIAL PRIMARY KEY,
    Username VARCHAR(255) UNIQUE NOT NULL,
    Passwordhash VARCHAR(255) NOT NULL
);

CREATE TABLE Food (
    Id SERIAL PRIMARY KEY,
    Userref INT,
    FoodName VARCHAR(255),
    Calories INT,
    notes TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Userref) REFERENCES AllUser(Id)
);
--drop table Exercise
CREATE TABLE Exercise (
    Id SERIAL PRIMARY KEY,
    Userref INT,
    ExerciseName VARCHAR(255),
    CaloriesBurned INT,
    ExerciseTime INT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Userref) REFERENCES AllUser(Id)
);

CREATE TABLE Meditation (
    Id SERIAL PRIMARY KEY,
    Userref INT,
    MeditationName VARCHAR(255),
    Minutes INT,
    notes TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Userref) REFERENCES AllUser(Id)
);

CREATE TABLE Journal (
    Id SERIAL PRIMARY KEY,
    Userref INT,
    Title VARCHAR(255),
    notes TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Userref) REFERENCES AllUser(Id)
);

CREATE TABLE Expenses (
    Id SERIAL PRIMARY KEY,
    Userref INT,
    ExpenseName VARCHAR(255),
    ExpenseAmount DECIMAL(10, 2),
    notes TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Userref) REFERENCES AllUser(Id)
);

CREATE TABLE Habits (
    Id SERIAL PRIMARY KEY,
    Userref INT,
    HabitName VARCHAR(255),
    notes TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Userref) REFERENCES AllUser(Id)
);


/*    -----------------    */

INSERT INTO AllUser (Username, Passwordhash)
VALUES ('YourUsername', 'YourPasswordHash');

INSERT INTO Food (Userref, FoodName, Calories, notes)
VALUES (1, 'Test Food', 500, 'Test note for Food');

INSERT INTO Exercise (Userref, ExerciseName, CaloriesBurned, notes)
VALUES (1, 'Test Exercise', 300, 'Test note for Exercise');

INSERT INTO Meditation (Userref, MeditationName, Minutes, notes)
VALUES (1, 'Test Meditation', 30, 'Test note for Meditation');

INSERT INTO Journal (Userref, Title, notes)
VALUES (1, 'Test Journal Entry', 'Test note for Journal');

INSERT INTO Expenses (Userref, ExpenseName, ExpenseAmount, notes)
VALUES (1, 'Test Expense', 100.00, 'Test note for Expense');

INSERT INTO Habits (Userref, HabitName, notes)
VALUES (1, 'Test Habit', 'Test note for Habit');




