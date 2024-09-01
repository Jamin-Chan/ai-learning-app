'use client'

import React from 'react';
import { useEffect } from 'react';


export default function lesson() {
    useEffect(() => {
        const schoolLevelSelect = document.getElementById('school-level-select');
        const gradeSelect = document.getElementById('grade-select');
        const subjectSelect = document.getElementById('subject-select');
        const lessonSelect = document.getElementById('lesson-select');
        const courseList = document.getElementById('course-list');
    
        const selectedCourses: string[] = [];

        const gradeOptions = {
            Elementary: ["Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"],
            Middle: ["Grade 6", "Grade 7", "Grade 8"],
            High: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"]
        };
        
        const lessonOptions = {
            Elementary: {
                Math: {
                    Kindergarten: ["Counting", "Basic Shapes", "Simple Addition"],
                    "Grade 1": ["Addition and Subtraction", "Place Value", "Measurement"],
                    "Grade 2": ["Multi-digit Addition", "Subtraction", "Introduction to Multiplication"],
                    "Grade 3": ["Multiplication and Division", "Fractions", "Geometry"],
                    "Grade 4": ["Multi-digit Multiplication", "Long Division", "Decimals"],
                    "Grade 5": ["Fractions and Decimals", "Pre-Algebra", "Geometry"]
                },
                English: {
                    Kindergarten: ["Letter Recognition", "Phonics", "Basic Reading"],
                    "Grade 1": ["Reading Comprehension", "Writing Sentences", "Spelling"],
                    "Grade 2": ["Reading Fluency", "Grammar Basics", "Story Writing"],
                    "Grade 3": ["Reading Strategies", "Paragraph Writing", "Vocabulary Building"],
                    "Grade 4": ["Literature Analysis", "Essay Writing", "Research Skills"],
                    "Grade 5": ["Critical Reading", "Creative Writing", "Public Speaking"]
                }
            },
            Middle: {
                Math: ["Pre-Algebra", "Geometry Basics", "Data and Statistics"],
                English: ["Literature Analysis", "Essay Writing", "Public Speaking"]
            },
            High: {
                Math: ["Algebra", "Trigonometry", "Calculus"],
                English: ["World Literature", "Composition", "Creative Writing"]
            }
        };

        function updateGrades() {
            const schoolLevel = schoolLevelSelect.value;
            gradeSelect.innerHTML = '<option value="">Select Grade</option>';
            
            if (schoolLevel && gradeOptions[schoolLevel]) {
                gradeOptions[schoolLevel].forEach(grade => {
                    const option = document.createElement('option');
                    option.value = grade;
                    option.textContent = grade;
                    gradeSelect.appendChild(option);
                });
            }
        }
        
        function updateLessons() {
            const schoolLevel = schoolLevelSelect.value;
            const grade = gradeSelect.value;
            const subject = subjectSelect.value;
            lessonSelect.innerHTML = '<option value="">Select Lesson</option>';
            
            if (schoolLevel && subject && lessonOptions[schoolLevel] && lessonOptions[schoolLevel][subject]) {
                let lessons = lessonOptions[schoolLevel][subject];
                if (schoolLevel === "Elementary" && lessons[grade]) {
                    lessons = lessons[grade];
                }
                lessons.forEach(lesson => {
                    const option = document.createElement('option');
                    option.value = lesson;
                    option.textContent = lesson;
                    lessonSelect.appendChild(option);
                });
            }
        }
        
        if(schoolLevelSelect){
            schoolLevelSelect.addEventListener('change', () => {
                updateGrades();
                updateLessons();
            });
        }

        if(gradeSelect){
            gradeSelect.addEventListener('change', updateLessons);
        }

        
        if(subjectSelect){
            subjectSelect.addEventListener('change', updateLessons);
        }
        
        function addCourse() {
            const schoolLevel = schoolLevelSelect.value;
            const grade = gradeSelect.value;
            const subject = subjectSelect.value;
            const lesson = lessonSelect.value;
            
            if (schoolLevel && grade && subject && lesson) {
                const course = `${schoolLevel} - ${grade} - ${subject} - ${lesson}`;
                if (!selectedCourses.includes(course)) {
                    selectedCourses.push(course);
                    const li = document.createElement('li');
                    li.textContent = course;
                    li.onclick = function() { openStudyPage(course); };
                    courseList.appendChild(li);
                }
            } else {
                alert("Please select all options before adding a course.");
            }
        }
        
        function openStudyPage(course) {
            const modal = document.getElementById("studyModal");
            const modalTitle = document.getElementById("modalTitle");
            const modalContent = document.getElementById("modalContent");
            
            modalTitle.textContent = course;
            modalContent.textContent = `Welcome to your study page for ${course}! Here you would find course materials, exercises, and resources to help you master this subject.`;
            
            modal.style.display = "block";
        }
        
        const modal = document.getElementById("studyModal");
        const span = document.getElementsByClassName("close")[0];
        

  
        window.onclick = function() {
            modal.style.display = "none";
        }
        
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    }, []);

    return(
        <div className="font-sans text-gray-800 leading-relaxed m-0 p-0 bg-gray-100" >
            <header className='color-'>
                <div className="w-4/5 m-auto overflow-hidden p-20">
                    <h1 className='m-0 text-center pb-5'>Educational Course Selection</h1>
                </div>
            </header>

            <div className="w-4/5 m-auto overflow-hidden p-20">
                <div className="p-20 bg-white pt-30 min-h-20 border-b-4 border-orange-700">
                    <div className="flex flex-wrap gap-2.5 mb-5">
                        <select id="school-level-select" className='p-2.5 text-base border border-white flex-grow min-w-52'>
                            <option value="">Select School Level</option>
                            <option value="Elementary">Elementary School</option>
                            <option value="Middle">Middle School</option>
                            <option value="High">High School</option>
                        </select>
                        <select id="grade-select" className='p-2.5 text-base border border-white flex-grow min-w-52'>
                            <option value="">Select Grade</option>
                        </select>
                        <select id="subject-select" className='p-2.5 text-base border border-white flex-grow min-w-52'>
                            <option value="">Select Subject</option>
                            <option value="Math">Mathematics</option>
                            <option value="English">English</option>
                        </select>
                        <select id="lesson-select" className='p-2.5 text-base border border-white flex-grow min-w-52'>
                            <option value="">Select Lesson</option>
                        </select>
                    </div>
                    <button onclick="addCourse()">Add to My Courses</button>
                    
                    <div id="selected-courses" className='mt-5'>
                        <h2>My Selected Courses</h2>
                        <p>Click on a course to start studying:</p>
                        <ul id="course-list" className='list-none p-0 flex flex-wrap gap-2.5'></ul>
                    </div>
                </div>
            </div>

            <div id="studyModal" className="hidden fixed z-10 inset-0 w-full h-full overflow-auto bg-black bg-opacity-40">
                <div className="bg-white my-12 mx-auto p-5 border border-gray-400 w-4/5 max-w-lg">
                    <span className="text-gray-400 float-right text-2xl font-bold">&times;</span>
                    <h2 id="modalTitle"></h2>
                    <p id="modalContent"></p>
                </div>
            </div>
        </div>
    )
}


































