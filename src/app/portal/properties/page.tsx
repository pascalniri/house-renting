"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, Eye, Loader2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import useProperty from "@/app/hooks/useProperty";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 5;

export default function PropertiesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { properties, loading, fetchProperties, deleteProperty, updateProperty } = useProperty();

  // Fetch properties on mount
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Calculate total pages
  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  
  // Get current items
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProperties = properties.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      await deleteProperty(id);
      // Adjust pagination if needed
      if (currentProperties.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    await updateProperty(id, { isPublished: !currentStatus });
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading text-blue-900 font-medium mb-2">
            Properties
          </h1>
          <p className="text-slate-500 text-xs">
            Manage your published real estate listings.
          </p>
        </div>
        <Link href="/portal/properties/new">
          <Button variant="default">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-medium h-12">Property</TableHead>
              <TableHead className="font-medium h-12">Location</TableHead>
              <TableHead className="font-medium h-12">Price</TableHead>
              <TableHead className="font-medium h-12">Type</TableHead>
              <TableHead className="font-medium h-12">Status</TableHead>
              <TableHead className="font-medium text-right h-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProperties.length > 0 ? (
              currentProperties.map((property) => (
                <TableRow
                  key={property.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200 flex items-center justify-center">
                        {property.imageUrl ? (
                          <img
                            src={property.imageUrl}
                            alt={property.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Home className="h-5 w-5 text-slate-400" />
                        )}
                      </div>
                      <div className="font-medium text-slate-900 truncate max-w-[200px]">
                        {property.title}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 py-4">
                    {property.location}
                  </TableCell>
                  <TableCell className="text-slate-900 font-medium py-4">
                    ${property.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-slate-600 py-4">{property.type}</TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={property.isPublished} 
                        onCheckedChange={() => handleTogglePublish(property.id, property.isPublished)}
                        id={`publish-${property.id}`} 
                      />
                      <Label htmlFor={`publish-${property.id}`} className="text-xs text-slate-600 font-normal cursor-pointer">
                        {property.isPublished ? "Published" : "Draft"}
                      </Label>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/portal/properties/${property.id}`} >
                        <Button
                          variant="default"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Eye size={12} />
                          <span className="sr-only">View</span>
                        </Button>
                      </Link>
                      <Link href={`/portal/properties/${property.id}/edit`}>
                        <Button
                          variant="default"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Edit size={12} />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(property.id)}
                        className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={12} />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                      <p>Loading properties...</p>
                    </div>
                  ) : (
                    "No properties found. Add your first property to get started."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-slate-200 p-4 bg-white flex items-center justify-end">
            <Pagination className="justify-end w-auto mx-0">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink 
                      href="#" 
                      isActive={currentPage === i + 1}
                      onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
