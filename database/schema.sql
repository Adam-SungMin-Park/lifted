set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"userEmail" TEXT NOT NULL UNIQUE,
	"userPW" TEXT NOT NULL,
	"userName" TEXT NOT NULL,
	"userGoalWeight" integer,
	"userGoalCalories" integer,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "userWeight" (
	"userWeightId" serial NOT NULL,
	"userId" integer NOT NULL,
	"createdAt" DATE NOT NULL,
	"userWeight" integer,
	CONSTRAINT "userWeight_pk" PRIMARY KEY ("userWeightId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "userCalories" (
	"userCaloriesId" serial NOT NULL,
	"userId" integer NOT NULL,
	"userFoodName" TEXT NOT NULL,
	"userFoodCalories" integer NOT NULL,
	"createdAt" DATE NOT NULL,
	CONSTRAINT "userCalories_pk" PRIMARY KEY ("userCaloriesId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "userWorkOut" (
	"userWorkoutId" serial NOT NULL,
	"userId" integer NOT NULL,
	"workoutPartId" integer NOT NULL,
	"exerciseId" integer NOT NULL,
	"createdAt" DATE NOT NULL,
	CONSTRAINT "userWorkOut_pk" PRIMARY KEY ("userWorkoutId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "exercises" (
	"exercisesId" serial NOT NULL,
	"userId" integer NOT NULL,
	"userWorkoutId" integer NOT NULL,
	"exerciseName" TEXT NOT NULL,
	"exerciseWeight" integer NOT NULL,
	"exerciseReps" integer NOT NULL,
	"exerciseVolume" integer NOT NULL,
	CONSTRAINT "exercises_pk" PRIMARY KEY ("exercisesId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "routines" (
	"routineId" serial NOT NULL,
	"userId" integer NOT NULL,
	"workoutPartId" integer NOT NULL,
	"routineName" TEXT NOT NULL,
	"exerciseId" integer NOT NULL,
	CONSTRAINT "routines_pk" PRIMARY KEY ("routineId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "routineExercise" (
	"routineId" integer NOT NULL,
	"exerciseId" integer NOT NULL,
	CONSTRAINT "routineExercise_pk" PRIMARY KEY ("routineId","exerciseId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "workoutParts" (
	"workoutPartName" TEXT NOT NULL,
	"workoutPartId" serial NOT NULL,
	CONSTRAINT "workoutParts_pk" PRIMARY KEY ("workoutPartId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "userWeight" ADD CONSTRAINT "userWeight_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "userCalories" ADD CONSTRAINT "userCalories_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "userWorkOut" ADD CONSTRAINT "userWorkOut_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "userWorkOut" ADD CONSTRAINT "userWorkOut_fk1" FOREIGN KEY ("workoutPartId") REFERENCES "workoutParts"("workoutPartId");
ALTER TABLE "userWorkOut" ADD CONSTRAINT "userWorkOut_fk2" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("exercisesId");

ALTER TABLE "exercises" ADD CONSTRAINT "exercises_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_fk1" FOREIGN KEY ("userWorkoutId") REFERENCES "userWorkOut"("userWorkoutId");

ALTER TABLE "routines" ADD CONSTRAINT "routines_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "routines" ADD CONSTRAINT "routines_fk1" FOREIGN KEY ("workoutPartId") REFERENCES "workoutParts"("workoutPartId");
ALTER TABLE "routines" ADD CONSTRAINT "routines_fk2" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("exercisesId");

ALTER TABLE "routineExercise" ADD CONSTRAINT "routineExercise_fk0" FOREIGN KEY ("routineId") REFERENCES "routines"("routineId");
ALTER TABLE "routineExercise" ADD CONSTRAINT "routineExercise_fk1" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("exercisesId");
