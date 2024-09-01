'use client'
import React, { useState, useEffect } from 'react';
import { Folder, ChevronRight, Plus, Settings, Calendar, Check } from 'lucide-react';

const categories = [
  { name: 'Math', color: 'bg-red-200', icon: '📐' },
  { name: 'Science', color: 'bg-green-200', icon: '🧪' },
  { name: 'History', color: 'bg-blue-200', icon: '🏛️' },
  { name: 'Literature', color: 'bg-yellow-200', icon: '📚' },
  { name: 'Art', color: 'bg-purple-200', icon: '🎨' },
];

const NoteApp = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [notes, setNotes] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [datePickerVisible, setDatePickerVisible] = useState(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    const savedEvents = localStorage.getItem('events');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedEvents) setUpcomingEvents(JSON.parse(savedEvents));
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('events', JSON.stringify(upcomingEvents));
  }, [notes, upcomingEvents]);

  const addNote = () => {
    const newNote = { 
      id: Date.now(), 
      content: '', 
      category: selectedCategory || 'Uncategorized',
      lastEdited: new Date().toISOString(),
      dueDate: null
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id, updates) => {
    const updatedNotes = notes.map(note => 
      note.id === id ? { ...note, ...updates, lastEdited: new Date().toISOString() } : note
    );
    setNotes(updatedNotes);
  };

  const toggleDatePicker = (noteId) => {
    setDatePickerVisible(datePickerVisible === noteId ? null : noteId);
  };

  const setNoteDate = (noteId, date) => {
    const existingEvent = upcomingEvents.find(event => event.noteId === noteId);
    if (existingEvent) {
      setUpcomingEvents(upcomingEvents.map(event => 
        event.noteId === noteId ? { ...event, date: date } : event
      ));
    } else {
      const note = notes.find(n => n.id === noteId);
      const newEvent = {
        id: Date.now(),
        title: note.content.split('\n')[0] || 'Untitled',
        date: date,
        noteId: noteId,
        completed: false
      };
      setUpcomingEvents([...upcomingEvents, newEvent]);
    }
    updateNote(noteId, { dueDate: date });
    setDatePickerVisible(null);
  };

  const toggleEventCompletion = (eventId) => {
    setUpcomingEvents(upcomingEvents.map(event => 
      event.id === eventId ? { ...event, completed: !event.completed } : event
    ));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-white shadow-md overflow-y-auto">
          <div className="p-4 flex items-center justify-between bg-blue-500 text-white">
            <h1 className="text-xl font-bold">Notes</h1>
            <Settings size={20} />
          </div>
          <div className="p-4">
            <div
              className={`flex items-center p-2 rounded-md cursor-pointer ${
                !selectedCategory ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              <Folder size={16} className="mr-2" />
              <span>All Notes</span>
            </div>
            {categories.map((category) => (
              <div
                key={category.name}
                className={`flex items-center p-2 rounded-md cursor-pointer ${
                  selectedCategory === category.name ? category.color : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <span className="mr-2">{category.icon}</span>
                <span>{category.name}</span>
                <ChevronRight size={16} className="ml-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white shadow-sm p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">{selectedCategory || 'All Notes'}</h2>
            <button
              onClick={addNote}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {notes
              .filter((note) => !selectedCategory || note.category === selectedCategory)
              .sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited))
              .map((note) => (
                <div key={note.id} className="bg-white p-4 rounded-md shadow mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                      Last edited: {new Date(note.lastEdited).toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold">{note.category}</span>
                  </div>
                  <textarea
                    className="w-full h-32 p-2 border rounded mb-2"
                    placeholder="Type your note here..."
                    value={note.content}
                    onChange={(e) => updateNote(note.id, { content: e.target.value })}
                  />
                  <div className="flex items-center">
                    <button
                      onClick={() => toggleDatePicker(note.id)}
                      className="flex items-center text-blue-500 hover:text-blue-600"
                    >
                      <Calendar size={16} className="mr-1" />
                      {note.dueDate ? new Date(note.dueDate).toLocaleDateString() : 'Set due date'}
                    </button>
                  </div>
                  {datePickerVisible === note.id && (
                    <input
                      type="date"
                      className="mt-2 p-2 border rounded"
                      onChange={(e) => setNoteDate(note.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-white shadow-md p-4">
        <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
        <div className="flex overflow-x-auto">
          {upcomingEvents
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((event) => (
              <div key={event.id} className={`flex-shrink-0 w-48 p-2 mr-4 rounded ${event.completed ? 'bg-gray-200' : 'bg-yellow-100'}`}>
                <div className="font-semibold">{event.title}</div>
                <div className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</div>
                <button
                  onClick={() => toggleEventCompletion(event.id)}
                  className={`mt-2 p-1 rounded ${event.completed ? 'bg-green-500' : 'bg-blue-500'} text-white`}
                >
                  {event.completed ? 'Completed' : 'Mark as done'}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NoteApp;