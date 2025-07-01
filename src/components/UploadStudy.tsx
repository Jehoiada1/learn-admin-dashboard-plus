
import React, { useState } from 'react';
import { Plus, X, Upload, FileText, Volume2, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface Chapter {
  id: string;
  title: string;
  number: number;
  pages: Page[];
}

interface Page {
  id: string;
  title: string;
  content: string;
  fileType: 'text' | 'pdf' | 'audio';
  fileName?: string;
}

const UploadStudy = () => {
  const [studyTitle, setStudyTitle] = useState('');
  const [studyDescription, setStudyDescription] = useState('');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const addChapter = () => {
    const newChapter: Chapter = {
      id: `chapter-${Date.now()}`,
      title: '',
      number: chapters.length + 1,
      pages: []
    };
    setChapters([...chapters, newChapter]);
  };

  const updateChapter = (chapterId: string, title: string) => {
    setChapters(chapters.map(chapter => 
      chapter.id === chapterId ? { ...chapter, title } : chapter
    ));
  };

  const removeChapter = (chapterId: string) => {
    setChapters(chapters.filter(chapter => chapter.id !== chapterId));
  };

  const addPage = (chapterId: string) => {
    const newPage: Page = {
      id: `page-${Date.now()}`,
      title: '',
      content: '',
      fileType: 'text'
    };
    setChapters(chapters.map(chapter => 
      chapter.id === chapterId 
        ? { ...chapter, pages: [...chapter.pages, newPage] }
        : chapter
    ));
  };

  const updatePage = (chapterId: string, pageId: string, updates: Partial<Page>) => {
    setChapters(chapters.map(chapter => 
      chapter.id === chapterId 
        ? {
            ...chapter,
            pages: chapter.pages.map(page => 
              page.id === pageId ? { ...page, ...updates } : page
            )
          }
        : chapter
    ));
  };

  const removePage = (chapterId: string, pageId: string) => {
    setChapters(chapters.map(chapter => 
      chapter.id === chapterId 
        ? { ...chapter, pages: chapter.pages.filter(page => page.id !== pageId) }
        : chapter
    ));
  };

  const handleFileUpload = (chapterId: string, pageId: string, file: File) => {
    const fileType = file.type.includes('pdf') ? 'pdf' : file.type.includes('audio') ? 'audio' : 'text';
    updatePage(chapterId, pageId, { 
      fileName: file.name, 
      fileType,
      content: file.type.includes('pdf') || file.type.includes('audio') ? `File: ${file.name}` : ''
    });
  };

  const handleSaveStudy = async () => {
    setIsUploading(true);
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    alert('Study uploaded successfully!');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload New Study</h1>
        <p className="text-gray-600">Create and organize your study materials with chapters and pages.</p>
      </div>

      <div className="space-y-8">
        {/* Study Details */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Study Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Study Title</label>
              <Input
                value={studyTitle}
                onChange={(e) => setStudyTitle(e.target.value)}
                placeholder="Enter study title..."
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea
                value={studyDescription}
                onChange={(e) => setStudyDescription(e.target.value)}
                placeholder="Describe what this study covers..."
                className="w-full h-24"
              />
            </div>
          </div>
        </Card>

        {/* Chapters */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Chapters</h2>
            <Button onClick={addChapter} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Chapter</span>
            </Button>
          </div>

          <div className="space-y-6">
            {chapters.map((chapter, chapterIndex) => (
              <div key={chapter.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 flex-1">
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Chapter {chapter.number}
                    </span>
                    <Input
                      value={chapter.title}
                      onChange={(e) => updateChapter(chapter.id, e.target.value)}
                      placeholder="Chapter title..."
                      className="flex-1"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeChapter(chapter.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Pages */}
                <div className="space-y-3">
                  {chapter.pages.map((page, pageIndex) => (
                    <div key={page.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Input
                          value={page.title}
                          onChange={(e) => updatePage(chapter.id, page.id, { title: e.target.value })}
                          placeholder="Page title..."
                          className="flex-1 mr-4 bg-white"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePage(chapter.id, page.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-100"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                          <Textarea
                            value={page.content}
                            onChange={(e) => updatePage(chapter.id, page.id, { content: e.target.value })}
                            placeholder="Enter page content or upload a file..."
                            className="w-full h-24 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">File Upload</label>
                          <div className="space-y-2">
                            <input
                              type="file"
                              accept=".pdf,.mp3,.wav,.ogg"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(chapter.id, page.id, file);
                              }}
                              className="hidden"
                              id={`file-${page.id}`}
                            />
                            <label
                              htmlFor={`file-${page.id}`}
                              className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                            >
                              <div className="text-center">
                                {page.fileType === 'pdf' ? (
                                  <FileText className="h-6 w-6 text-red-500 mx-auto mb-1" />
                                ) : page.fileType === 'audio' ? (
                                  <Volume2 className="h-6 w-6 text-green-500 mx-auto mb-1" />
                                ) : (
                                  <Upload className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                                )}
                                <span className="text-sm text-gray-600">
                                  {page.fileName || 'Upload file'}
                                </span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addPage(chapter.id)}
                  className="mt-3 w-full border-dashed"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Page to Chapter {chapter.number}
                </Button>
              </div>
            ))}
          </div>

          {chapters.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No chapters yet. Click "Add Chapter" to get started.</p>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button variant="outline" className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </Button>
          
          <div className="flex space-x-3">
            <Button variant="outline">Save as Draft</Button>
            <Button 
              onClick={handleSaveStudy}
              disabled={isUploading || !studyTitle.trim()}
              className="flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{isUploading ? 'Uploading...' : 'Publish Study'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadStudy;
