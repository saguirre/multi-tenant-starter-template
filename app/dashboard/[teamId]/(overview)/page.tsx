import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create Your Reveal",
  description: "Create and customize your gender reveal experience.",
};

export default function HomePage() {
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Create Your Reveal</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Basic Info</CardTitle>
                <CardDescription>
                  Set up the basic details for your reveal
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add form components for basic reveal info */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Customize Design</CardTitle>
                <CardDescription>
                  Choose colors and themes for your reveal
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add design customization options */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Share Settings</CardTitle>
                <CardDescription>
                  Configure how you want to share your reveal
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add sharing configuration options */}
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  See how your reveal will look
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add reveal preview component */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
