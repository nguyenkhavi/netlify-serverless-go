//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';

export default function Page() {
  return (
    <main className="grid gap-4 px-20 py-10">
      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button color="default">Small</Button>
        <Button color="default" className="btnmd">
          Medium
        </Button>
        <Button color="default" className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button color="default" disabled>
          Small
        </Button>
        <Button color="default" disabled className="btnmd">
          Medium
        </Button>
        <Button color="default" disabled className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button color="default" isLoading>
          Small
        </Button>
        <Button color="default" isLoading className="btnmd">
          Medium
        </Button>
        <Button color="default" isLoading className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button color="primary">Small</Button>
        <Button color="primary" className="btnmd">
          Medium
        </Button>
        <Button color="primary" className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button disabled color="primary">
          Small
        </Button>
        <Button disabled color="primary" className="btnmd">
          Medium
        </Button>
        <Button disabled color="primary" className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button isLoading color="primary">
          Small
        </Button>
        <Button isLoading color="primary" className="btnmd">
          Medium
        </Button>
        <Button isLoading color="primary" className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button color="default" variant="outlined">
          Small
        </Button>
        <Button color="default" variant="outlined" className="btnmd">
          Medium
        </Button>
        <Button color="default" variant="outlined" className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button disabled color="default" variant="outlined">
          Small
        </Button>
        <Button disabled color="default" variant="outlined" className="btnmd">
          Medium
        </Button>
        <Button disabled color="default" variant="outlined" className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button isLoading color="default" variant="outlined">
          Small
        </Button>
        <Button isLoading color="default" variant="outlined" className="btnmd">
          Medium
        </Button>
        <Button isLoading color="default" variant="outlined" className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button color="primary" variant="outlined">
          Small
        </Button>
        <Button color="primary" variant="outlined" className="btnmd">
          Medium
        </Button>
        <Button color="primary" variant="outlined" className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button disabled color="primary" variant="outlined">
          Small
        </Button>
        <Button disabled color="primary" variant="outlined" className="btnmd">
          Medium
        </Button>
        <Button disabled color="primary" variant="outlined" className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button isLoading color="primary" variant="outlined">
          Small
        </Button>
        <Button isLoading color="primary" variant="outlined" className="btnmd">
          Medium
        </Button>
        <Button isLoading color="primary" variant="outlined" className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button color="default" variant="text">
          Small
        </Button>
        <Button color="default" variant="text" className="btnmd">
          Medium
        </Button>
        <Button color="default" variant="text" className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button disabled color="default" variant="text">
          Small
        </Button>
        <Button disabled color="default" variant="text" className="btnmd">
          Medium
        </Button>
        <Button disabled color="default" variant="text" className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button isLoading color="default" variant="text">
          Small
        </Button>
        <Button isLoading color="default" variant="text" className="btnmd">
          Medium
        </Button>
        <Button isLoading color="default" variant="text" className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button color="primary" variant="text">
          Small
        </Button>
        <Button color="primary" variant="text" className="btnmd">
          Medium
        </Button>
        <Button color="primary" variant="text" className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button disabled color="primary" variant="text">
          Small
        </Button>
        <Button disabled color="primary" variant="text" className="btnmd">
          Medium
        </Button>
        <Button disabled color="primary" variant="text" className="btnlg">
          Large
        </Button>
      </div>

      <div className={classcat(['grid auto-cols-max grid-flow-col gap-4'])}>
        <Button isLoading color="primary" variant="text">
          Small
        </Button>
        <Button isLoading color="primary" variant="text" className="btnmd">
          Medium
        </Button>
        <Button isLoading color="primary" variant="text" className="btnlg">
          Large
        </Button>
      </div>
    </main>
  );
}
