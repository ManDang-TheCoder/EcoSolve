"use client";

import { useState } from "react";
import { Share2, Facebook, Twitter, Linkedin, Copy, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { copyToClipboard } from "@/lib/polyfills";

interface IssueShareCardProps {
  issueId: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export function IssueShareCard({ issueId, title, description, imageUrl }: IssueShareCardProps) {
  const [copied, setCopied] = useState(false);
  
  // Generate URL for the issue
  const issueUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/issues/${issueId}`
    : `/issues/${issueId}`;
    
  // Truncate description to 100 characters
  const shortDescription = description.length > 100 
    ? `${description.substring(0, 100)}...` 
    : description;
  
  // Social media share URLs
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(issueUrl)}&quote=${encodeURIComponent(title)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(issueUrl)}&text=${encodeURIComponent(`Check out this environmental issue: ${title}`)}&hashtags=environment,sustainability`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(issueUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(shortDescription)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(`Environmental Issue: ${title}`)}&body=${encodeURIComponent(`I found this environmental issue that needs attention:\n\n${title}\n\n${description}\n\nView it here: ${issueUrl}`)}`;
  
  const handleCopyToClipboard = async () => {
    const success = await copyToClipboard(issueUrl);
    if (success) {
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 3000);
    } else {
      toast.error("Failed to copy link. Please try again.");
    }
  };
  
  const openShareWindow = (url: string) => {
    try {
      window.open(url, "_blank", "width=600,height=400");
    } catch (error) {
      console.error("Error opening share window:", error);
      // Fallback to regular navigation
      window.location.href = url;
    }
  };
  
  return (
    <Card className="border-t-4 border-t-green-500">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openShareWindow(facebookShareUrl)}>
                <Facebook className="mr-2 h-4 w-4 text-blue-600" />
                <span>Facebook</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openShareWindow(twitterShareUrl)}>
                <Twitter className="mr-2 h-4 w-4 text-blue-400" />
                <span>Twitter</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openShareWindow(linkedinShareUrl)}>
                <Linkedin className="mr-2 h-4 w-4 text-blue-700" />
                <span>LinkedIn</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                try {
                  window.location.href = emailShareUrl;
                } catch (error) {
                  console.error("Error opening email client:", error);
                  // Create a fallback link for users to copy
                  handleCopyToClipboard();
                  toast.info("Email client couldn't be opened. Link copied to clipboard instead.");
                }
              }}>
                <Mail className="mr-2 h-4 w-4 text-orange-500" />
                <span>Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyToClipboard}>
                {copied ? (
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="mr-2 h-4 w-4" />
                )}
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <p className="mt-2 text-muted-foreground line-clamp-2">{shortDescription}</p>
      </CardContent>
      
      <CardFooter className="bg-muted/50 py-2 px-6">
        <div className="flex items-center justify-between w-full text-sm">
          <span>Help spread awareness</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => document.getElementById(`issue-${issueId}-share-dropdown`)?.click()}
          >
            Share Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 