
import React, { useState } from 'react';
import { Upload, Calendar, Tag, FileText, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const UploadDevotion = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    category: '',
    file: null as File | null
  });

  const categories = [
    'Daily Devotion',
    'Prayer',
    'Faith',
    'Hope',
    'Love',
    'Worship',
    'Scripture Study',
    'Reflection'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    console.log('Uploading devotion:', formData);
    // TODO: Implement Supabase upload logic
    alert('Devotion uploaded successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-brown mb-2">Upload Devotion</h1>
        <p className="text-brand-brown/70">Share daily spiritual guidance with your community</p>
      </div>

      <Card className="max-w-2xl bg-white border-brand-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-brown">
            <FileText className="h-5 w-5 text-brand-gold" />
            New Devotion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-brand-brown font-medium">
                Devotion Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter devotion title"
                className="border-brand-border focus:border-brand-gold"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-brand-brown font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of the devotion"
                className="border-brand-border focus:border-brand-gold min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="category" className="text-brand-brown font-medium">
                  <Tag className="inline h-4 w-4 mr-1" />
                  Category
                </Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 py-2 border border-brand-border rounded-md focus:border-brand-gold focus:outline-none bg-white"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file" className="text-brand-brown font-medium">
                <Upload className="inline h-4 w-4 mr-1" />
                Upload File (PDF or Audio)
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept=".pdf,.mp3,.wav,.m4a"
                onChange={handleFileChange}
                className="border-brand-border focus:border-brand-gold"
              />
              {formData.file && (
                <p className="text-sm text-brand-brown/60">
                  Selected: {formData.file.name}
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Upload Devotion
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setFormData({ title: '', description: '', date: '', category: '', file: null })}
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

export default UploadDevotion;
