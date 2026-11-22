-- CreateTable
CREATE TABLE "students" (
    "prn" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "department" TEXT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("prn")
);
