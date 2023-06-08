'use client';

//THIRD PARTY MODULES
import * as React from 'react';
import classcat from 'classcat';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import Calendar from '_@landing/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '_@landing/components/ui/popover';
//SHARED
import CalendarIcon from '_@shared/icons/CalendarIcon';

export default function Page({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <div className={classcat(['grid gap-2', className])}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outlined"
            trailingIcon={<CalendarIcon className="h-4 w-4" />}
            leadingIcon={<CalendarIcon className="h-4 w-4" />}
            // className={classcat([
            //   'w-[300px] justify-start text-left font-normal',
            //   !date && 'text-muted-foreground',
            // ])}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto bg-secondary p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
