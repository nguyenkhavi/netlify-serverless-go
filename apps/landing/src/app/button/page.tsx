//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import UserIcon from '_@shared/icons/UserIcon';
import ArrowRightIcon from '_@shared/icons/ArrowRightIcon';

export default function Page() {
  return (
    <main className="grid gap-4 px-20 py-10">
      <div className="grid auto-cols-max grid-flow-col items-center gap-4">
        <Button>Small</Button>
        <Button className="btnmd">Medium</Button>
        <Button className="btnlg">Large</Button>
        <Button className="btnxlg">X-Large</Button>
      </div>

      <div className="grid auto-cols-max grid-flow-col items-center gap-4">
        <Button leadingIcon={<UserIcon />}>Small</Button>
        <Button leadingIcon={<UserIcon />} className="btnmd">
          Medium
        </Button>
        <Button leadingIcon={<UserIcon />} className="btnlg">
          Large
        </Button>
        <Button leadingIcon={<UserIcon />} className="btnxlg">
          X-Large
        </Button>
      </div>

      <div className="grid auto-cols-max grid-flow-col items-center gap-4">
        <Button trailingIcon={<ArrowRightIcon />}>Small</Button>
        <Button trailingIcon={<ArrowRightIcon />} className="btnmd">
          Medium
        </Button>
        <Button trailingIcon={<ArrowRightIcon />} className="btnlg">
          Large
        </Button>
        <Button trailingIcon={<ArrowRightIcon />} className="btnxlg">
          X-Large
        </Button>
      </div>

      <div className="grid auto-cols-max grid-flow-col items-center gap-4">
        <Button disabled>Small</Button>
        <Button disabled className="btnmd">
          Medium
        </Button>
        <Button disabled className="btnlg">
          Large
        </Button>
        <Button disabled className="btnxlg">
          X-Large
        </Button>
      </div>

      <div className="grid auto-cols-max grid-flow-col items-center gap-4">
        <Button isLoading>Small</Button>
        <Button isLoading className="btnmd">
          Medium
        </Button>
        <Button isLoading className="btnlg">
          Large
        </Button>
        <Button isLoading className="btnxlg">
          X-Large
        </Button>
      </div>

      <div className="grid auto-cols-max grid-flow-col items-center gap-4">
        <Button variant="outlined">Small</Button>
        <Button variant="outlined" className="btnmd">
          Medium
        </Button>
        <Button variant="outlined" className="btnlg">
          Large
        </Button>
        <Button variant="outlined" className="btnxlg">
          X-Large
        </Button>
      </div>

      <div className="grid auto-cols-max grid-flow-col items-center gap-4">
        <Button leadingIcon={<UserIcon />} variant="outlined">
          Small
        </Button>
        <Button leadingIcon={<UserIcon />} variant="outlined" className="btnmd">
          Medium
        </Button>
        <Button leadingIcon={<UserIcon />} variant="outlined" className="btnlg">
          Large
        </Button>
        <Button leadingIcon={<UserIcon />} variant="outlined" className="btnxlg">
          X-Large
        </Button>
      </div>

      <div className="grid auto-cols-max grid-flow-col items-center gap-4">
        <Button trailingIcon={<ArrowRightIcon />} variant="outlined">
          Small
        </Button>
        <Button trailingIcon={<ArrowRightIcon />} variant="outlined" className="btnmd">
          Medium
        </Button>
        <Button trailingIcon={<ArrowRightIcon />} variant="outlined" className="btnlg">
          Large
        </Button>
        <Button trailingIcon={<ArrowRightIcon />} variant="outlined" className="btnxlg">
          X-Large
        </Button>
      </div>

      <div className="grid auto-cols-max grid-flow-col items-center gap-4">
        <Button disabled variant="outlined">
          Small
        </Button>
        <Button disabled variant="outlined" className="btnmd">
          Medium
        </Button>
        <Button disabled variant="outlined" className="btnlg">
          Large
        </Button>
        <Button disabled variant="outlined" className="btnxlg">
          X-Large
        </Button>
      </div>

      <div className="grid auto-cols-max grid-flow-col items-center gap-4">
        <Button isLoading variant="outlined">
          Small
        </Button>
        <Button isLoading variant="outlined" className="btnmd">
          Medium
        </Button>
        <Button isLoading variant="outlined" className="btnlg">
          Large
        </Button>
        <Button isLoading variant="outlined" className="btnxlg">
          X-Large
        </Button>
      </div>
    </main>
  );
}
