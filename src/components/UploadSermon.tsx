
import React, { useState } from 'react';
import { Upload, Calendar, User, Video, FileText, Save, Link } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const UploadSermon = () => {
  const [formData, setFormData] = useState({
    title: '',
    speaker: '',
    date: '',
    videoUrl: '',
    summary: '',
    file: null as File | null
  });

  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Uploading sermon:', formData);
    // TODO: Implement Supabase upload logic
    alert('Sermon uploaded successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-brown mb-2">Upload Sermon</h1>
        <p className="text-brand-brown/70">Share inspiring messages with your congregation</p>
      </div>

      <Card className="max-w-2xl bg-white border-brand-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-brown">
            <Video className="h-5 w-5 text-brand-gold" />
            New Sermon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-brand-brown font-medium">
                Sermon Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter sermon title"
                className="border-brand-border focus:border-brand-gold"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="speaker" className="text-brand-brown font-medium">
                  <User className="inline h-4 w-4 mr-1" />
                  Speaker
                </Label>
                <Input
                  id="speaker"
                  name="speaker"
                  value={formData.speaker}
                  onChange={handleInputChange}
                  placeholder="Speaker name"
                  className="border-brand-border focus:border-brand-gold"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-brand-brown font-medium">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="border-brand-border focus:border-brand-gold"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-brand-brown font-medium">
                Video/Audio Content
              </Label>
              
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setUploadMethod('url')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    uploadMethod === 'url' 
                      ? 'bg-brand-gold text-white' 
                      : 'bg-brand-beige text-brand-brown hover:bg-brand-soft-gold/30'
                  }`}
                >
                  <Link className="inline h-4 w-4 mr-1" />
                  URL Link
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMethod('file')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    uploadMethod === 'file' 
                      ? 'bg-brand-gold text-white' 
                      : 'bg-brand-beige text-brand-brown hover:bg-brand-soft-gold/30'
                  }`}
                >
                  <Upload className="inline h-4 w-4 mr-1" />
                  File Upload
                </button>
              </div>

              {uploadMethod === 'url' ? (
                <div className="space-y-2">
                  <Label htmlFor="videoUrl" className="text-brand-brown font-medium">
                    Video/Audio URL
                  </Label>
                  <Input
                    id="videoUrl"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/watch?v=... or audio URL"
                    className="border-brand-border focus:border-brand-gold"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="file" className="text-brand-brown font-medium">
                    Upload Audio/Video File
                  </Label>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="audio/*,video/*"
                    onChange={handleFileChange}
                    className="border-brand-border focus:border-brand-gold"
                  />
                  {formData.file && (
                    <p className="text-sm text-brand-brown/60">
                      Selected: {formData.file.name}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary" className="text-brand-brown font-medium">
                Summary
              </Label>
              <Textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                placeholder="Brief summary of the sermon message"
                className="border-brand-border focus:border-brand-gold min-h-[120px]"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Upload Sermon
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setFormData({ title: '', speaker: '', date: '', videoUrl: '', summary: '', file: null })}
              >
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadSermon;
