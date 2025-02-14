"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface Property {
  id?: number
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  status: string
  type: string
  images: string[]
}

interface PropertyFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (property: Property) => void
  property?: Property | null
}

export function PropertyFormModal({ isOpen, onClose, onSubmit, property }: PropertyFormModalProps) {
  const [formData, setFormData] = useState<Property>({
    title: "",
    description: "",
    price: 0,
    location: "",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    status: "active",
    type: "apartment",
    images: [],
  })

  const [imageFiles, setImageFiles] = useState<File[]>([])

  useEffect(() => {
    if (property) {
      setFormData(property)
    } else {
      setFormData({
        title: "",
        description: "",
        price: 0,
        location: "",
        bedrooms: 0,
        bathrooms: 0,
        area: 0,
        status: "active",
        type: "apartment",
        images: [],
      })
    }
    setImageFiles([])
  }, [property])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setImageFiles((prevFiles) => [...prevFiles, ...newFiles])

      // Create object URLs for preview
      const newImageUrls = newFiles.map((file) => URL.createObjectURL(file))
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImageUrls],
      }))
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // In a real application, you would upload the images to a server or cloud storage
    // and get back the URLs to store in the property data
    // For this example, we'll just use the local object URLs

    onSubmit(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{property ? "Edit Property" : "Add New Property"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="area">Area (sqm)</Label>
            <Input id="area" name="area" type="number" value={formData.area} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            <div className="flex flex-wrap gap-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Property image ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0 w-6 h-6"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <Label
                htmlFor="images"
                className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
              >
                <span className="flex items-center space-x-2">
                  <Upload className="w-6 h-6 text-gray-600" />
                  <span className="font-medium text-gray-600">Click to upload images or drag and drop</span>
                </span>
              </Label>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{property ? "Update" : "Add"} Property</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

