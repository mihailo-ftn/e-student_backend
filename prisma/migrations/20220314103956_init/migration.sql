-- CreateEnum
CREATE TYPE "SubjectType" AS ENUM ('REQUIRED', 'ELECTIVE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STUDENT', 'PROFESSOR');

-- CreateTable
CREATE TABLE "Grade" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modul" (
    "id" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL,
    "moduleCode" TEXT NOT NULL,

    CONSTRAINT "Modul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "classLabel" INTEGER NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "jmbg" TEXT NOT NULL,
    "brind" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'STUDENT',
    "modulID" TEXT NOT NULL,
    "classID" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamRecord" (
    "id" TEXT NOT NULL,
    "points" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "passed" BOOLEAN NOT NULL DEFAULT false,
    "gradeID" TEXT,
    "examID" TEXT,
    "studentID" TEXT,
    "singed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ExamRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "subjectID" TEXT,
    "exPeriodID" TEXT,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "espp" INTEGER NOT NULL,
    "professorID" TEXT NOT NULL,
    "type" "SubjectType" NOT NULL,
    "modulID" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "jmbg" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'PROFESSOR',

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExaminationPeriod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "beginningDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "modulID" TEXT,
    "active" BOOLEAN DEFAULT true,

    CONSTRAINT "ExaminationPeriod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Modul_moduleName_key" ON "Modul"("moduleName");

-- CreateIndex
CREATE UNIQUE INDEX "Modul_moduleCode_key" ON "Modul"("moduleCode");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_jmbg_key" ON "Student"("jmbg");

-- CreateIndex
CREATE UNIQUE INDEX "Student_brind_key" ON "Student"("brind");

-- CreateIndex
CREATE UNIQUE INDEX "ExamRecord_gradeID_key" ON "ExamRecord"("gradeID");

-- CreateIndex
CREATE UNIQUE INDEX "ExamRecord_examID_key" ON "ExamRecord"("examID");

-- CreateIndex
CREATE UNIQUE INDEX "Exam_subjectID_key" ON "Exam"("subjectID");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_subjectName_modulID_key" 
ON "Subject"("subjectName", "modulID");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_jmbg_key" ON "Professor"("jmbg");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_modulID_fkey" FOREIGN KEY ("modulID") REFERENCES "Modul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamRecord" ADD CONSTRAINT "ExamRecord_gradeID_fkey" FOREIGN KEY ("gradeID") REFERENCES "Grade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamRecord" ADD CONSTRAINT "ExamRecord_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamRecord" ADD CONSTRAINT "ExamRecord_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_subjectID_fkey" FOREIGN KEY ("subjectID") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_exPeriodID_fkey" FOREIGN KEY ("exPeriodID") REFERENCES "ExaminationPeriod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_modulID_fkey" FOREIGN KEY ("modulID") REFERENCES "Modul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_professorID_fkey" FOREIGN KEY ("professorID") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExaminationPeriod" ADD CONSTRAINT "ExaminationPeriod_modulID_fkey" FOREIGN KEY ("modulID") REFERENCES "Modul"("id") ON DELETE SET NULL ON UPDATE CASCADE;
