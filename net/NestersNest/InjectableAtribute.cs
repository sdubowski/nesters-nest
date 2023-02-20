using System;
using System.Collections.Generic;
using System.Text;

namespace NestersNest
{
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public class InjectableAttribute : Attribute
    {
    }
}
