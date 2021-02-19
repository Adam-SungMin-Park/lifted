set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"userEmail" TEXT NOT NULL UNIQUE,
	"userPW" TEXT NOT NULL,
	"userGoalWeight" integer,
	"userGoalCalories" integer,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "userWeight" (
	"userWeightId" serial NOT NULL,
	"userId" integer ,
	"createdAt" DATE NOT NULL UNIQUE,
	"userWeight" DECIMAL,
	CONSTRAINT "userWeight_pk" PRIMARY KEY ("userWeightId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "userCalories" (
	"userCaloriesId" serial NOT NULL,
	"userFoodName" TEXT NOT NULL,
	"userFoodCalories" integer NOT NULL,
	"userMealId" integer NOT NULL,
	"createdAt" DATE NOT NULL,
	CONSTRAINT "userCalories_pk" PRIMARY KEY ("userCaloriesId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "userWorkOut" (
	"workOutId" serial NOT NULL,
	"userId" integer,
	"workOutPart" TEXT NOT NULL,
	"createdAt" DATE NOT NULL,
	CONSTRAINT "userWorkOut_pk" PRIMARY KEY ("workOutId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "exercises" (
	"exercisesId" serial NOT NULL,
	"exerciseName" TEXT NOT NULL,
	"exerciseWeight" integer NOT NULL,
	"exerciseReps" integer NOT NULL,
	"workOutId" integer NOT NULL,
	"createdAt" DATE NOT NULL,
	"workOutPart" TEXT NOT NULL,
	CONSTRAINT "exercises_pk" PRIMARY KEY ("exercisesId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "userDailyMeal" (
	"userMealId" serial NOT NULL,
	"userId" integer,
	"createdAt" DATE NOT NULL,
	CONSTRAINT "userDailyMeal_pk" PRIMARY KEY ("userMealId")
) WITH (
  OIDS=FALSE
);






ALTER TABLE "userCalories" ADD CONSTRAINT "userCalories_fk0" FOREIGN KEY ("userMealId") REFERENCES "userDailyMeal"("userMealId");



ALTER TABLE "exercises" ADD CONSTRAINT "exercises_fk0" FOREIGN KEY ("workOutId") REFERENCES "userWorkOut"("workOutId");
