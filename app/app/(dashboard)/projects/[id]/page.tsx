import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <Topbar title="در حال توسعه" />
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-sm w-full text-center">
          <CardContent className="p-8">
            <div className="text-4xl mb-4">🚧</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">در حال توسعه</h2>
            <p className="text-sm text-gray-500 mb-6">این صفحه در فاز بعدی توسعه اضافه می‌شود.</p>
            <Link href="/projects">
              <Button variant="outline" size="sm">بازگشت</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
