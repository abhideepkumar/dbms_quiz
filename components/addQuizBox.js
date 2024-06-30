import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { processCSV } from '@/app/actions';

const QuizUpload = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Quiz</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">CSV Upload</h3>
          </CardHeader>
          <CardContent>
            <form id="csvForm" action={processCSV}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="csvFile">CSV File</Label>
                  <Input id="csvFile" name="csvFile" type="file" accept=".csv" required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="timeInput">Time (minutes)</Label>
                  <Input id="timeInput" name="timeInput" type="number" placeholder="Enter time in minutes" required />
                </div>
              </div>
            </form>
          </CardContent>
          <div className="flex justify-between p-4">
            <Button variant="outline" type="button">Cancel</Button>
            <Button type="submit" form="csvForm">Proceed</Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default QuizUpload;